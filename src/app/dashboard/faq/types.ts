import React from 'react';

export interface FaqAnswer {
    id: number;
    text: React.ReactNode;
}

export interface FaqItem {
    id: number;
    question: string;
    answer: FaqAnswer[];
}
