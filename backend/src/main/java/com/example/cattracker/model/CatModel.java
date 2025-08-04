package com.example.cattracker.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CatModel {
    private Long id;

    private String name;
    private String description;
    private boolean fed;
    private boolean isDog;
}
