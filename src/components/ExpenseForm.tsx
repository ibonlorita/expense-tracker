import { useState } from 'react';
import { ExpenseFormData } from '../types';
import { validateRequired, validateAmount, getTodayString, categoryOptions } from '../utils';
import styles from './ExpenseForm.module.scss';

// 定義組建的Props 型別
interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
}

// 表單初始值
const initialFormData: ExpenseFormData = {
  amount: '',
  description: '',
  category: '',
  date: getTodayString(),
  type: 'expense',


}

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  // 表單資料狀態
  const [formData, setFormData] = useState<ExpenseFormData>(initialFormData);
  
  // 錯誤訊息狀態
  const [errors, setErrors] = useState<Partial<ExpenseFormData>>({});

  // 提交中狀態 - 防止重複提交
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 處理輸入欄位改變
  const handleInputChange = (filed: keyof ExpenseFormData, value: string) => {

    console.log(`更新欄位：${filed}, 為：${value}`);

    // 更新表單資料, 使用展開運算保留其他欄位
    setFormData(prev => ({
      ...prev,  // 保留其他欄位
      [filed]: value,  // 更新指定欄位
    }));

    // 清除該欄位的錯誤訊息, 即時回饋
    if (errors[filed]) {
      setErrors(prev => ({
        ...prev, 
        [filed]: undefined, // 清除錯誤訊息
      }));
    }
  }

  // 驗證表單  -手動實作驗證邏輯
  const validateForm = (): boolean => {
    const newErrors: Partial<ExpenseFormData> = {};

    // 驗證金額
    if (!validateRequired(formData.amount)) {
      newErrors.amount = '請輸入金額';
    } else if (!validateAmount(formData.amount)) {
      newErrors.amount = '請輸入有效的金額';
    }

    // 驗證描述
    if (!validateRequired(formData.description)) {
      newErrors.description = '請輸入描述';
    }

    // 驗證日期
    if (!validateRequired(formData.date)) {
      newErrors.date = '請選擇日期';
    }

    // 驗證類別
    if (!validateRequired(formData.category)) {
      newErrors.category = '請選擇類別';
    }

    console.log('驗證結果:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent) => {
    // 阻止瀏覽器預設的提交行為
    e.preventDefault()

    console.log('表單提交:', formData);

    if(!validateForm()) {
      console.log('表單驗證失敗，停止提交');
      return; // 驗證失敗就不提交
    }

    setIsSubmitting(true);

    try {
      // 呼叫父組件傳入的 onSubmit 函數
      onSubmit(formData);

      // 提交成功後，重置表單
      setFormData(initialFormData);
      setErrors({});
      console.log('表單提交成功');
    } catch (error) {
      console.error('表單提交失敗:', error);
    } finally {
      setIsSubmitting(false);
    }

  };

  // 根據收入/支出類型取得類別選項
  const getCategoryOptions = () => {
    const options = formData.type === 'income' ? categoryOptions.income 
    : categoryOptions.expense;

    console.log(`取得${formData.type}類別選項:`, options);
    return options;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>新增紀錄</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 收入/支出類型選擇 */}
        <div className={styles.typeSelector}>
          <button
            type="button"
            className={`${styles.typeButton} ${formData.type === 'expense' ? styles.active : '' }`}
            onClick={() => {
              handleInputChange('type', 'expense');
              // 切換時重置類別
              handleInputChange('category', '');
            }}
          >
            支出
          </button>
          <button
            type="button"
            className={`${styles.typeButton} ${formData.type === 'income' ? styles.active : '' }`}
            onClick={() => {
              handleInputChange('type', 'income');
              // 切換時重置類別
              handleInputChange('category', '');
            }}
          >
            收入
          </button>
        </div>

        {/* 金額輸入 */}
        <div className='form-group'>
          <label htmlFor='amount'>金額</label>
          <input
            id='amount'
            type='number'
            min='0'
            step='1'
            placeholder='請輸入金額'
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            className={errors.amount ? styles.error : ''}
          />
          {errors.amount && <span className={styles.errorText}>{errors.amount}</span>}
        </div>

        {/* 類別類型 */}
        <div className='form-group'>
          <label htmlFor='category'>類別</label>
          <select
            id='category'
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={errors.category ? styles.error : ''}
          >
            <option value=''>請選擇類別</option>
            {getCategoryOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category && <span className={styles.errorText}>{errors.category}</span>}
        </div>

        {/* 描述輸入 */}
        <div className='form-group'>
          <label htmlFor='description'>描述</label>
          <input
            id='description'
            type='text'
            placeholder='請輸入描述'
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={errors.description ? styles.error : ''}
          />
          {errors.description && <span className={styles.errorText}>{errors.description}</span>}
        </div>

        {/* 日期選擇 */}
        <div className='form-group'>
          <label htmlFor='date'>日期</label>
          <input
            id='date'
            type='date'
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={errors.date ? styles.error : ''}
          />
          {errors.date && <span className={styles.errorText}>{errors.date}</span>}
        </div>

        {/* 提交按鈕 */}
        <button
          type='submit'
          disabled={isSubmitting}
          className={`btn btn-primary ${styles.submitButton}`}
        >
          {isSubmitting ? '新增中...' : '新增記錄'}
        </button>
      </form>

    </div>
  )
}

export default ExpenseForm;