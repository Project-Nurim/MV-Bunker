package com.nurim.mvbunker.user;
import com.nurim.mvbunker.common.MyConst;
import com.nurim.mvbunker.common.security.model.CustomUserPrincipals;

import com.nurim.mvbunker.user.model.UserDomain;
import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private MyConst myconst;

    @GetMapping("/login")
    public void toLoginPage() {}

    @GetMapping("/join")
    public void toJoinPage() {}

    @GetMapping("/auth")
    public String authenticationLocal(UserEntity param) {
        service.auth(param);
        return "redirect:/user/login";
    }

    @PostMapping("/join")
    public String JoinUser(UserEntity param, Model model) {
        model.addAttribute("needAuth", 1);
        service.join(param);
        return "redirect:/user/login";
    }

    @GetMapping("/favReview")
    public void favReview(){}

    @GetMapping("/followingReviewer")
    public void followReviewer(){}

    @GetMapping("/myReview")
    public void myReview(){}

    @GetMapping("/myReviewCmt")
    public void myReviewCmt(){}

    @GetMapping("/profile")
    public void profile(Model model, @AuthenticationPrincipal CustomUserPrincipals userDetails){
        UserEntity loginUser = userDetails.getUser();
//        model.addAttribute(myconst.PROFILE, service.selProfileImg(loginUser));
        UserDomain activity = service.selUserProfile(loginUser);
        model.addAttribute("activity", activity);
    }

    @PostMapping("/profileImg")
    public String profileImg(MultipartFile img){
        service.profileImg(img);
        return "redirect:profile";
    }

    @ResponseBody
    @GetMapping("/mainProfile")
    public Map<String, Object> mainProfile(UserEntity param){
        return service.updUserMainProfile(param);
    }

    @GetMapping("/profileMod")
    public void profileMod(@AuthenticationPrincipal CustomUserPrincipals userDetails, Model model){
        UserEntity loginUser = userDetails.getUser();
        UserDomain activity = service.selUserProfile(loginUser);
        model.addAttribute("activity",activity);
    }

    @PostMapping("/profileMod")
    public void profileMod(Model model, @AuthenticationPrincipal CustomUserPrincipals userDetails){
        UserEntity loginUser = userDetails.getUser();
        model.addAttribute(myconst.PROFILE, service.selProfileImg(loginUser));
    }

}