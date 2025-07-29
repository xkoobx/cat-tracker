package com.example.cattracker.repository;

import com.example.cattracker.entity.Cat;
import com.example.cattracker.entity.FeedingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FeedingStatusRepository extends JpaRepository<FeedingStatus, Long> {

    Optional<FeedingStatus> findByCatAndDateAndFeedingTime(Cat cat, LocalDate date, FeedingStatus.FeedingTime feedingTime);

    void deleteAllByCat(Cat cat);

    void deleteByDateAndFeedingTime(LocalDate date, FeedingStatus.FeedingTime feedingTime);
}
