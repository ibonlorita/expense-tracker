import { useState } from 'react';
import { Expense } from '../types';
import { categoryOptions } from '../utils';
import styles from './ExpenseList.module.scss';
import ExpenseItem from './expense-item/ExpenseItem';

// 定義組件的 Props
interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  loading?: boolean;
}

const ExpenseList = ({
  expenses,
  onDelete,
  loading = false,
}: ExpenseListProps) => {
  
  // 篩選狀態
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  
  // 根據類型篩選記錄
  const filteredExpenses = expenses.filter(expense => {
    if (filterType === 'all') return true;
    return expense.type === filterType;
  });

  // 取得類別顯示名稱
  const getCategoryLabel = (category: string, type: 'income' | 'expense'): string => {
    const options = type === 'income' ? categoryOptions.income : categoryOptions.expense;
    const option = options.find(opt => opt.value === category);
    return option ? option.label : category;
  }

  // 處理刪除確認
  const handleDeleteClick = (id: string) => {
    setShowDeleteConfirm(id)
  }

  // 確認刪除
  const confirmDelete = (id: string) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  }

  // 取消刪除
  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  }

  // 載入中狀態
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>載入中...</p>
        </div>
      </div>
    )
  }

  // 空狀態
  if (expenses.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}></div>
          <h3>目前沒有任何記錄</h3>
          <p>開始你的第一筆記收支記錄吧！</p>
        </div>
      </div>
    )
  }

  // 篩選按鈕
  const filterOptions = [
    {
      key: 'all' as const,
      label: '全部',
      count: expenses.length,
    },
    {
      key: 'income' as const,
      label: '收入',
      count: expenses.filter(e => e.type === 'income' ).length
    },
    {
      key: 'expense' as const,
      label: '支出',
      count: expenses.filter(e => e.type === 'expense' ).length
    }
  ]


  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* 篩選按鈕 */}
        {
          filterOptions.map(option => (
            <button
              key={option.key}
              className={`${styles.filterButton} ${filterType === option.key ? styles.active : ''}`}
              onClick={() => setFilterType(option.key)}
            >
              {option.label} ({option.count})
            </button>
          ))
        }
        {/* 記錄列表 */}
        <div className={styles.list}>
          {
            filteredExpenses.length === 0 ? (
              // 篩選後沒有結果
              <div className={styles.noResults}>
                <p>沒有符合條件的記錄</p>
              </div>
            ) : (
              // 顯示篩選後的記錄
              filteredExpenses.map(expense => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDeleteClick={handleDeleteClick}
                  showDeleteConfirm={showDeleteConfirm === expense.id}
                  onConfirmDelete={() => confirmDelete(expense.id)}
                  onCancelDelete={cancelDelete}
                  getCategoryLabel={getCategoryLabel}
                />
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ExpenseList;

