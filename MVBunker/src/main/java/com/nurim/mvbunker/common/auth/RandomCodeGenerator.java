package com.nurim.mvbunker.common.auth;

import org.springframework.stereotype.Component;

@Component
public class RandomCodeGenerator {
    public int getRandomInteger(int min, int max) {
        return (int) ((Math.random() * (max - min + 1)) + min);
    }
    public int getRandomInteger(int max) {
        return (int) (Math.random() * (max + 1));
    }
    public char getRandomChar() {
        while(true) {
            char result = (char) getRandomInteger(65, 122);
            if(result < 91 || result > 96) {
                return result;
            }
        }
    }

    public String getRandomCode(int len) { //facebook_clone에서는UserService join()에서 입력했었다.
        StringBuilder randVal = new StringBuilder();
        for(int i = 0; i < len; i++) {
            if(Math.random() > 0.5) {
                randVal.append(getRandomInteger(9));
            } else {
                randVal.append(getRandomChar());
            }
        }

        return randVal.toString();
    }
}
