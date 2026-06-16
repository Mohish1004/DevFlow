package com.devflow.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Priority {
    LOW("Low"),
    MEDIUM("Medium"),
    HIGH("High");

    private final String displayName;

    Priority(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static Priority fromDisplayName(String displayName) {
        for (Priority priority : values()) {
            if (priority.displayName.equals(displayName)) {
                return priority;
            }
        }
        throw new IllegalArgumentException("Unknown Priority: " + displayName);
    }
}
