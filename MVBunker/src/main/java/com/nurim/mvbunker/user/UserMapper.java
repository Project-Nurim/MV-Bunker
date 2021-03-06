package com.nurim.mvbunker.user;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.movies.model.MovieDomain;
import com.nurim.mvbunker.movies.model.MovieEntity;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.user.model.SubEntity;
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
    List<ReviewDomain> selReviewList(UserEntity param, PagingDTO pagingDTO);

    //구독
    int insSub(SubEntity param);
    int delSub(SubEntity param);
    int chkSub(SubEntity param);
    List<UserDomain> mySubUser(UserEntity param);
    UserDomain subUserProfile(UserEntity param);

    //내가좋아요한영화
    int selIsFav(MovieFavEntity param);
    int insFavMovie (MovieFavEntity param);
    int delFavMovie (MovieFavEntity param);
    List<MovieDomain> selFavMovieList(UserEntity param);


    //내가 좋아요 누른 리뷰
    List<ReviewDomain> selLikeReviews (UserEntity param, PagingDTO pagingDTO);
}
