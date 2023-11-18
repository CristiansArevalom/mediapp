package com.mitocode.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Sign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idSign;

    @Column(name="signDate",nullable = false)
    private LocalDateTime signDate;

    @Column(name="temperature",nullable = false)
    private String temperature;

    @Column(name="pulse",nullable = false)
    private String pulse;

    @Column(name = "rhythm", nullable = false)
    private String rhythm;
    
    @ManyToOne //FK
    @JoinColumn(name= "id_patient", nullable = false, foreignKey = @ForeignKey(name = "FK_SIGNS_PATIENT"))
    private Patient patient;

}
