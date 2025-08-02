// 紀錄基本資料結構
export interface Expense {
  id: string; // 唯一識別碼，區分每筆紀錄
  amount: number;
  description: string; // 描述
  category: string;
  date: string;
  type: 'income' | 'expense';  // 收入或支出

}

// 表單資料的型別
export interface ExpenseFormData {
  amount: string;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

// 統計資料的型別
export interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  count: number; // 紀錄總數
}

// 類別選項的型別
export interface CategoryOption {
  value: string;
  label: string;
}