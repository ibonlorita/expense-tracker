import { Expense } from '../types';

// 建立金額格式化器
const currencyFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'currency',     // 貨幣格式
  currency: 'TWD',       // 台幣
  minimumFractionDigits: 0,  // 最少小數位數
});
// 格式化金額顯示 (加上千分位符號)
export const formatAmount = (amount: number): string => {
  return currencyFormatter.format(amount);
};

// 格式化日期顯示
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// 驗證金額是否有效
export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

// 驗證必填欄位
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// 計算統計資料
export const calculateSummary = (expenses: Expense[]) => {
  // 計算總收入（type為 income 的紀錄）
  const totalIncome = expenses
    .filter(expense => expense.type === 'income') // 只要收入
    .reduce((sum, expense) => sum + expense.amount, 0); // 加總

  // 計算總支出 （type為 expense 的紀錄）
  const totalExpense = expenses
    .filter(expense => expense.type === 'expense') // 只要支出
    .reduce((sum, expense) => sum + expense.amount, 0); // 加總

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense, // 餘額 = 總收入 - 總支出
    count: expenses.length, // 紀錄總數
  };
};

// 產生唯一ID
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// 取得今天的日期字串
export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
}

// 類別選項
export const categoryOptions = {
  income: [
    { value: 'salary', label: '薪水' },
    { value: 'bonus', label: '獎金' },
    { value: 'investment', label: '投資' },
    { value: 'other-income', label: '其他收入' },
  ],
  expense: [
    { value: 'food', label: '餐飲' },
    { value: 'transport', label: '交通' },
    { value: 'shopping', label: '購物' },
    { value: 'entertainment', label: '娛樂' },
    { value: 'healthcare', label: '醫療' },
    { value: 'education', label: '教育' },
    { value: 'other-expense', label: '其他支出' }
  ],
};
