import { useState } from 'react';
import { useExpenses } from './hooks/useExpenses';
import './styles/globals.scss';
import styles from './App.module.scss';
import { ExpenseFormData } from './types';
import { Summary, ExpenseForm, ExpenseList } from './components';


function App() {

  const {
    expenses,
    summary,
    loading,
    addExpense,
    deleteExpense,
    clearAllExpenses,
  } = useExpenses()

  // 控制清空確認對話框顯示
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // 處理新增記錄
  const handleAddExpense = (formData: ExpenseFormData) => {
    addExpense(formData);
    // 可以在這裡加入成功提示
    console.log('新增記錄成功');
  }

  // 處理刪除記錄
  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
    // 可以在這裡加入成功提示
    console.log('刪除記錄成功');
  }

  // 處理清空所有記錄
  const handleClearAll = () => {
    clearAllExpenses();
    setShowClearConfirm(false);
    console.log('清空所有記錄成功');
  }

  return (
    <div className={styles.app}>
      {/* 頁面頭 */}
      <header className={styles.header}>
        <div className='container'>
          <h1 className={styles.appTitle}>記帳本</h1>
          <p className={styles.appSubtitle}>
            輕鬆記錄，聰明理財
          </p>
        </div>
      </header>

      {/* 主要內容區域 */}
      <main className={styles.main}>
        <div className='container'>
          {/* 統計區塊 */}
          <Summary
            summary={summary}
            loading={loading}
          />

          {/* 新增記錄表單 */}
          <ExpenseForm
            onSubmit={handleAddExpense}
          />

          {/* 記錄列表 */}
          <div className={styles.listSection}>
            <div className={styles.listHeader}>
              <h2 className={styles.listTitle}>記錄明細</h2>

              {/* 清空所有按鈕 */}
              {
                expenses.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className={`btn btn-danger ${styles.clearButton}`}
                  >
                    清空所有記錄
                  </button>
                )
              }

              <ExpenseList 
                expenses={expenses}
                onDelete={handleDeleteExpense}
                loading={loading}
              />

            </div>
          </div>

          {/* 清空確認對話框 */}
          {
            showClearConfirm && (
              <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h3 className={styles.modalTitle}>確認清空</h3>
                <p className={styles.modalText}>
                  確定要清空所有記錄嗎？此操作無法復原。
                </p>
                <div className={styles.modalButtons}>
                  <button
                    onClick={handleClearAll}
                    className="btn btn-danger"
                  >
                    確定清空
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="btn"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
            )
          }


        </div>
      </main>

      {/* 頁面尾 */}
      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.footerText}>
            © 2025 我的記帳本 - 讓理財變得更簡單 ✨
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
