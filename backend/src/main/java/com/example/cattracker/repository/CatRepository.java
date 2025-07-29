package com.example.cattracker.repository;

import com.example.cattracker.entity.Cat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatRepository extends JpaRepository<Cat, Long> {}
