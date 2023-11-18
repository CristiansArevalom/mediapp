package com.mitocode.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SignDTO {
    
    @EqualsAndHashCode.Include
    private Integer idSign;
    
    @NotNull
    private LocalDateTime signDate;

    @NotEmpty
    @NotNull
    private String temperature;

    @NotEmpty
    @NotNull
    private String pulse;

    @NotEmpty
    @NotNull
    private String rhythm;

    @NotNull
    private PatientDTO patient;
}
