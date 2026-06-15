package com.devflow.repository;

import com.devflow.model.User;
import com.devflow.model.UserPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserPreferencesRepository extends JpaRepository<UserPreferences, Long> {
    Optional<UserPreferences> findByUser(User user);
}
