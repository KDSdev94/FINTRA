<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import AnalysisChartCard from './AnalysisChartCard.vue'
import { chartBarsPercent, chartTicks, computeDailyChart, formatCurrency } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'

const { transactions } = storeToRefs(useFinanceStore())
const chart = computed(() => computeDailyChart(transactions.value))
const allValues = computed(() => [...chart.value.incomeByLabel, ...chart.value.expenseByLabel])
</script>

<template>
  <AnalysisChartCard
    :labels="chart.labels"
    :green-bars="chartBarsPercent(chart.incomeByLabel)"
    :blue-bars="chartBarsPercent(chart.expenseByLabel)"
    :left-ticks="chartTicks(allValues)"
    income-label="Duit Masuk"
    :income-value="formatCurrency(chart.totalIncome)"
    expense-label="Duit Cabut"
    :expense-value="formatCurrency(chart.totalExpense)"
  />
</template>
