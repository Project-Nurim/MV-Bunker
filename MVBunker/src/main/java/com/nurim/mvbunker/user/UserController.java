package com.nurim.mvbunker.user;
import com.nurim.mvbunker.common.MyConst;
import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.common.security.IAuthenticationFacade;
import com.nurim.mvbunker.common.security.model.CustomUserPrincipals;

import com.nurim.mvbunker.movies.MoviesService;
import com.nurim.mvbunker.movies.model.HoverVO;
import com.nurim.mvbunker.movies.model.MovieDomain;
import com.nurim.mvbunker.movies.model.MovieEntity;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.ReviewService;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.user.model.UserDomain;
import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;
    @Autowired
    private MoviesService moviesService;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private IAuthenticationFacade auth;

    @Autowired
    private MyConst myconst;

    @GetMapping("/login")
    public void toLoginPage() {}

    @GetMapping("/join")
    public void toJoinPage() {}

    @GetMapping("/auth")
    public String authenticationLocal(UserEntity param) {
        service.auth(param);
        return "redirect:/home";
    }

    @PostMapping("/join")
    public String JoinUser(UserEntity param, Model model) {
        model.addAttribute("needAuth", 1);
        service.join(param);
        return "redirect:/home";
    }

    @GetMapping("/favReview")
    public void favReview(Model model) {
        UserEntity param = auth.getLoginUser();
        PagingDTO pagingDTO = new PagingDTO(0);
        List<ReviewDomain> selLikeReviews = service.selLikeReviews(param,pagingDTO);
        model.addAttribute("selLikeReviews", selLikeReviews);
    }

    @ResponseBody
    @GetMapping("/getFavReviewInfinite")
    public List<ReviewDomain> getFavReviewInfinite(UserEntity userInfo,PagingDTO pagingDTO) {
        if(userInfo.getI_user() == 0) {
            userInfo.setI_user(auth.getLoginUserPk());
        }
        return service.selReviewList(userInfo, pagingDTO);
    }

    @GetMapping("/followingReviewer")
    public void followReviewer(@AuthenticationPrincipal CustomUserPrincipals userDetails, Model model){
        UserEntity loginUser = userDetails.getUser();
        List<UserDomain> followReviewer = service.mySubUser(loginUser);
//        List<UserDomain> followReviewer_active = service.selUserProfile()
        model.addAttribute("followReviewer",followReviewer);
    }

    @GetMapping("/followingReviewerDetail")
    public void followReviewerDetail(@AuthenticationPrincipal CustomUserPrincipals userDetails, PagingDTO pagingDTO, Model model){
        UserEntity loginUser = userDetails.getUser();
        int loginUserPk = loginUser.getI_user();

        List<ReviewDomain> selReviewList = service.selReviewList(loginUser,pagingDTO);
        UserDomain subUserProfile = service.subUserProfile(loginUser);
        model.addAttribute("subUserProfile",subUserProfile);
        model.addAttribute("subUserReview",selReviewList);
    }

    @GetMapping("/myReview")
    public void myReview(UserEntity param, Model model){
        PagingDTO pagingDTO = new PagingDTO(0);
        List<ReviewDomain> selReviewList = service.selReviewList(param, pagingDTO);
        MovieFavEntity mf_Entity = new MovieFavEntity();
        mf_Entity.setI_user(param.getI_user());
        List<HoverVO> selHover2 = moviesService.selHover1(mf_Entity);
        model.addAttribute("selReviewList", selReviewList);
        model.addAttribute("selHover2", selHover2);
    }

    @ResponseBody
    @GetMapping("/getReviewInfinite")
    public List<ReviewDomain> getReviewInfinite(UserEntity userInfo, PagingDTO pagingDTO) {
        if(userInfo.getI_user() == 0) {
            userInfo = auth.getLoginUser();
        }
        return service.selReviewList(userInfo, pagingDTO);
    }


    @GetMapping("/myFavMovie")
    public void myFavMovie(@AuthenticationPrincipal CustomUserPrincipals userDetails, Model model){
        UserEntity loginUser = userDetails.getUser();
        List<MovieDomain> myFavMovie = service.selFavMovieList(loginUser);
        model.addAttribute("myFavMovie", myFavMovie);
    }

    @GetMapping("/profile")
    public void profile(Model model,  UserEntity param){
        if(param.getI_user() == 0) {
            param = auth.getLoginUser();
        }
//        model.addAttribute(myconst.PROFILE, service.selProfileImg(loginUser));
        UserDomain activity = service.selUserProfile(param);
        model.addAttribute("activity", activity);
    }

    @PostMapping("/profileImg")
    public String profileImg(MultipartFile img){
        service.profileImg(img);
        return "redirect:profile";
    }

    @ResponseBody
    @GetMapping("/mainProfile")
    public Map<String, Object> mainProfile(@RequestBody UserEntity param){
        return service.updUserMainProfile(param);
    }

    @GetMapping("/profileMod")
    public void profileMod(@AuthenticationPrincipal CustomUserPrincipals userDetails, Model model){
        UserEntity loginUser = userDetails.getUser();
        UserDomain activity = service.selUserProfile(loginUser);
        model.addAttribute("activity",activity);
    }

    @PostMapping("/profileMod")
    public String profileMod(UserEntity param){
        if(service.updUserProfile(param) == 1)
        return "redirect:/user/profile";
        else{
            return "redirect:/user/profileMod";
        }
    }

    @PostMapping("/byeUser")
    public String delUser(String upw, String upw_chk, String del_chk) {
        if(upw.equals(upw_chk) && del_chk.equals("탈퇴하겠습니다.")) {
            if(service.byeUser(upw) == 1) {
                return "redirect:/user/logout";
            }else {
                return "redirect:/user/profile";
            }
        }
        return "redirect:/user/profile";
    }

    @ResponseBody
    @PostMapping("/checkPw")
    public boolean checkPw(@RequestBody UserEntity param) {
        String upw = param.getUpw();
        System.out.println("비밀번호는 : " + upw);
        return service.checkPassword(upw);
    }
}