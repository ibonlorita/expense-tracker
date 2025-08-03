import { Summary as SummaryType } from '../types';
import { formatAmount } from '../utils';
import styles from './Summary.module.scss';
interface SummaryProps {
  summary: SummaryType;
  loading?: boolean;
}

const Summary = ({
  summary,
  loading = false,
}: SummaryProps) => {

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
        </div>
      </div>
    )
  }

  // 判斷餘額狀態
  const balanceStatus = summary.balance >= 0 ? 'positive' : 'negative';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>收支摘要</h2>

      <div className={styles.grid}>
        {/* 總收入卡片 */}
        <div className={`${styles.card} ${styles.income}`}>
          <div className={styles.cardIcon}>📈</div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>總收入</h3>
            <p className={styles.cardAmount}>
              {formatAmount(summary.totalIncome)}
            </p>
          </div>
        </div>

        {/* 總支出卡片 */}
        <div className={`${styles.card} ${styles.expense}`}>
          <div className={styles.cardIcon}>📉</div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>總支出</h3>
            <p className={styles.cardAmount}>
              {formatAmount(summary.totalExpense)}
            </p>
          </div>
        </div>

        {/* 餘額卡片 */}
        <div className={`${styles.card} ${styles.balance} ${styles[balanceStatus]}`}>
          <div className={styles.cardIcon}>
            {balanceStatus === 'positive' ? '💰' : '⚠️'}
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>餘額</h3>
            <p className={styles.cardAmount}>
              {formatAmount(summary.balance)}
            </p>
          </div>
        </div>


        {/* 記錄卡片總數 */}
        <div className={`${styles.card} ${styles.count}`}>
          <div className={styles.cardIcon}>📝</div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>記錄數</h3>
            <p className={styles.cardAmount}>
              {summary.count} 筆
            </p>
          </div>
        </div>


        {/* 餘額狀態提示 */}
        {
          summary.balance > 0 && (
            <div className={`${styles.balanceAlert} ${styles[balanceStatus]}`}>
              {
                balanceStatus === 'positive' ? (
                  <p>
                    恭喜！你的財務狀況良好，繼續保持！
                  </p>
                ) : (
                  <p>
                    注意！你的支出已經超過收入，需要調整消費習慣。
                  </p>
                )}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Summary;