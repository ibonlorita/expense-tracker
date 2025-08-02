import { useState, useEffect } from 'react';
import { Expense, ExpenseFormData } from '../types';
import { generateId, calculateSummary } from '../utils';

// 本地儲存
const STORAGE_KEY = 'expense-tracker-data';

// 管理所有記帳相關狀態與邏輯
export const useExpenses = () => {

  // 所有記錄陣列
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // 載入中狀態
  const [loading, setLoading] = useState(true);

  // 載入時從 localStorage 讀取資料
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setExpenses(parsedData);
      }
    } catch (error) {
      console.error('讀取資料失敗:', error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('儲存資料失敗:', error);
      }
    }
  },[expenses, loading]);
 
  // 新增記憶的函數
  const addExpense = (FormData: ExpenseFormData) => {
    const newExpense: Expense = {
      id: generateId(),
      amount: parseFloat(FormData.amount),
      description: FormData.description,
      category: FormData.category,
      date: FormData.date,
      type: FormData.type,
    };

    // 使用函數式更新，確保狀態正確更新
    // 新紀錄放在最前面
    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);

  };

  // 刪除記錄的函數
  const deleteExpense = (id: string) => {
    // 使用 filter 篩選出不是要刪除的記錄
    setExpenses(prevExpenses => prevExpenses.filter(expenses => expenses.id !== id));
  };

  // 清空所有記錄的函數
  const clearAllExpenses = () => {
    setExpenses([]);
  };

  // 計算統計資料
  const summary = calculateSummary(expenses);

  // 依照日期排序的記錄(最新的在前面)
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    expenses: sortedExpenses, // 排序後的記錄
    summary, // 統計
    loading, 
    addExpense,
    deleteExpense,
    clearAllExpenses,
  };
};