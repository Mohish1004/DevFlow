package com.devflow.controller;

import com.devflow.model.Review;
import com.devflow.model.enums.ReviewStatus;
import com.devflow.repository.ReviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
public class ReviewApiController {

    private final ReviewRepository reviewRepository;

    public ReviewApiController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        if (review.getId() == null) {
            review.setId("review-" + UUID.randomUUID().toString().substring(0, 8));
        }
        review.setSubmittedAt(LocalDateTime.now());
        Review saved = reviewRepository.save(review);
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Review> updateReviewStatus(@PathVariable("id") String id, @RequestParam("status") String statusStr) {
        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Review review = optionalReview.get();
        try {
            ReviewStatus status = ReviewStatus.valueOf(statusStr.toUpperCase().replace(" ", "_"));
            review.setStatus(status);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        Review updated = reviewRepository.save(review);
        return ResponseEntity.ok(updated);
    }
}
