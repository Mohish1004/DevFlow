package com.devflow.model.enums;

public enum ReviewStatus {
    WAITING_FOR_REVIEW("Waiting for Review"),
    REVIEWING("Reviewing"),
    CHANGES_REQUIRED("Changes Required"),
    APPROVED("Approved"),
    REJECTED("Rejected"),
    MERGED("Merged");

    private final String displayName;

    ReviewStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
