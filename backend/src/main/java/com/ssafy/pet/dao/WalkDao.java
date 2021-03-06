package com.ssafy.pet.dao;

import java.util.Map;

import com.ssafy.pet.dto.PlaceDto;
import com.ssafy.pet.dto.WalkDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WalkDao {

    public int createWalk(WalkDto walkDto);

    public int endWalk(WalkDto walkDto);
    
    public Map<String, Object> getLikeInfo(Integer lid);

}
