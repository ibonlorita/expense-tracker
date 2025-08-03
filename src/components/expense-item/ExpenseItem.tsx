import { Expense } from '../../types';
import { formatAmount, formatDate } from '../../utils';
import styles from './ExpenseItem.module.scss';


interface ExpenseItemProps {
  expense: Expense;
  onDeleteClick: (id: string) => void;
  showDeleteConfirm: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  getCategoryLabel: (category: string, type: 'income' | 'expense') => string;
}


const ExpenseItem = ({
  expense,
  onDeleteClick,
  showDeleteConfirm,
  onConfirmDelete,
  onCancelDelete,
  getCategoryLabel,
}: ExpenseItemProps) => {

  return (
    <div className={styles.item}>
      <div className={styles.itemContent}>
        {/* 左側 */}
        <div className="itemLeft">
          <div className={`${styles.typeIndicator} ${styles[expense.type]}`}>
            {expense.type === 'income' ? '收入' : '支出'}
          </div>

          {/* 紀錄資訊 */}
          <div className={styles.itemInfo}>
            <p className={styles.itemDescription}>
              {expense.description}
            </p>
            <p className={styles.itemMeta}>
              {getCategoryLabel(expense.category, expense.type)} - {formatDate(expense.date)}
            </p>
          </div>
        </div>

        {/* 右側 */}
        <div className={styles.itemRight}>
          {/* 金額顯示 */}
          <div className={`${styles.amount} ${styles[expense.type]}`}>
            {expense.type === 'income' ? '+' : '-'} {formatAmount(expense.amount)}
          </div>

          {/* 刪除按鈕 */}
          <button
            type='button'
            title='刪除'
            className={styles.deleteButton}
            onClick={() => onDeleteClick(expense.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>

          {/* 刪除確認對話框 */}
          {
            showDeleteConfirm && (
              <div className={styles.confirmDialog}>
                <p>確定要刪除這筆記錄嗎？</p>
                <div className={styles.confirmButtons}>
                  <button 
                    onClick={onConfirmDelete}
                    className={`btn btn-danger ${styles.confirmButton}`}
                  >
                    確定刪除
                  </button>
                  <button
                    onClick={onCancelDelete}
                    className={`btn ${styles.cancelButton}`}
                  >
                    取消
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )

}

export default ExpenseItem;