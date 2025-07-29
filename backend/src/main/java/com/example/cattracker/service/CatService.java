package com.example.cattracker.service;

import com.example.cattracker.entity.Cat;
import com.example.cattracker.entity.FeedingStatus;
import com.example.cattracker.model.CatModel;
import com.example.cattracker.repository.CatRepository;
import com.example.cattracker.repository.FeedingStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CatService {

    @Autowired
    private CatRepository catRepo;
    @Autowired
    private FeedingStatusRepository feedingStatusRepo;

    public Cat addCat(Cat cat) {
        return catRepo.save(cat);
    }

    @Transactional
    public void deleteCat(Long id) {
        Cat cat = catRepo.findById(id).get();
        feedingStatusRepo.deleteAllByCat(cat);
        catRepo.deleteById(id);
    }

    public List<CatModel> getAllCats(LocalDate date, FeedingStatus.FeedingTime feedingTime) {
        return catRepo.findAll().stream().map(cat -> feedingStatusRepo.findByCatAndDateAndFeedingTime(cat, date, feedingTime)
                                                                  .orElse(FeedingStatus.builder()
                                                                                        .cat(cat)
                                                                                        .date(date)
                                                                                        .feedingTime(feedingTime)
                                                                                        .fed(false) // Default to not fed
                                                                                        .build())
        ).map(feedingStatus -> CatModel.builder()
                    .id(feedingStatus.getCat().getId())
                    .name(feedingStatus.getCat().getName())
                    .description(feedingStatus.getCat().getDescription())
                    .fed(feedingStatus.isFed())
                .build()).toList();
    }

    public Optional<CatModel> markFed(Long id, LocalDate date ,FeedingStatus.FeedingTime feedingTime, boolean fed) {
        return catRepo.findById(id)
                .map(cat -> {
                    FeedingStatus feedingStatus = feedingStatusRepo.findByCatAndDateAndFeedingTime(cat, date, feedingTime)
                            .orElse(FeedingStatus.builder()
                                    .cat(cat)
                                    .date(date)
                                    .feedingTime(feedingTime)
                                    .fed(fed) // Default to not fed
                                    .build());
                    feedingStatus.setFed(fed);
                    return feedingStatusRepo.save(feedingStatus);
                }).map(feedingStatus -> CatModel.builder()
                        .id(feedingStatus.getCat().getId())
                        .name(feedingStatus.getCat().getName())
                        .description(feedingStatus.getCat().getDescription())
                        .fed(feedingStatus.isFed())
                        .build());
    }

    @Transactional
    public void resetFeedingStatus(LocalDate date, FeedingStatus.FeedingTime feedingTime) {
        feedingStatusRepo.deleteByDateAndFeedingTime(date, feedingTime);
    }
}
