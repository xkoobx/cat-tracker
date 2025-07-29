package com.example.cattracker.controller;

import com.example.cattracker.entity.Cat;
import com.example.cattracker.entity.FeedingStatus;
import com.example.cattracker.model.CatModel;
import com.example.cattracker.service.CatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/cats")
public class CatController {

    @Autowired
    private CatService catService;

    @PostMapping
    public ResponseEntity<Cat> createCat(@RequestBody Cat cat) {
        return ResponseEntity.ok(catService.addCat(cat));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCat(@PathVariable Long id) {
        catService.deleteCat(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{date}/{feedingTime}")
    public ResponseEntity<List<CatModel>> getAll(
            @PathVariable LocalDate date,
            @PathVariable FeedingStatus.FeedingTime feedingTime
    ) {
        return ResponseEntity.ok(catService.getAllCats(date, feedingTime));
    }

    @PutMapping("/{id}/{date}/{feedingTime}/feed")
    public ResponseEntity<CatModel> markFed(
            @PathVariable Long id,
            @PathVariable LocalDate date,
            @PathVariable FeedingStatus.FeedingTime feedingTime,
            @RequestParam boolean fed
    ) {
        return catService.markFed(id, date, feedingTime, fed)
                         .map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{date}/{feedingTime}/reset")
    public ResponseEntity<Void> resetFeeding(
            @PathVariable LocalDate date,
            @PathVariable FeedingStatus.FeedingTime feedingTime
    ) {
        catService.resetFeedingStatus(date, feedingTime);
        return ResponseEntity.ok().build();
    }
}
