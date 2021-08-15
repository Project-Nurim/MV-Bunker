package com.nurim.mvbunker.user;

import com.nurim.mvbunker.movies.model.MovieEntity;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.user.model.SubProfileDomain;
import com.nurim.mvbunker.user.model.UserDomain;
import com.nurim.mvbunker.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
    int insUser(UserEntity param);
    int authUser(UserEntity param);
    UserEntity selUser(UserEntity param);
    int updUser(UserEntity param);
    int delUser(UserEntity parma);

    UserDomain selUserProfile(UserEntity param);
    List<ReviewDomain> selMyReviewList(UserEntity param);

    //구독
    int insSub(UserEntity param, int sub_ed_user);
    int delSub(UserEntity param, int sub_ed_user);
    UserDomain mySubUser(UserEntity param);
    SubProfileDomain subUserProfile(UserEntity param);

    //내가좋아요한영화
    int insFavMovie (int id, UserEntity param);
    int delFavMovie (int id, UserEntity param);
    MovieFavEntity selFavMovieList(UserEntity param);

    //팔로우
    SubProfileDomain subUserProfile(int sub_ed_user);

}
