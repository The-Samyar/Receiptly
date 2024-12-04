import styles from './FormStepThree.module.css'
import { useFormContext } from '../../../context/FormContext'

function getSum(total, newValue) {
  return total + (newValue.count * newValue.costPerUnit)
}

const getEffort = (total, newValue) => {
  return total + (newValue.effort * newValue.count)
}
export const FormStepThree = () => {

  const { Data, goToStep } = useFormContext();

  var totalCount = Data.products.reduce(getSum, 0);
  var totalEffort = Data.products.reduce(getEffort, 0);
  return (
    <>
      <div className={styles.StepThreeContainer}>
        <div className={styles.ProductsSection}>
          <div className={styles.productsContainer}>
            <div className={styles.productsDetail}>
              <h3 className={styles.productsTitle}>Products</h3>
              <div className={styles.productsInfo}>
                {Data.products.map((item) => (
                  item.count !== 0 ?
                    <p>{item.count} * {item.title} : ${item.costPerUnit * item.count} (About {item.effort * item.count} hours)</p>
                    : null
                ))}
              </div>
            </div>

            <div className={styles.productsSummary}>
              <p>Total cost: ${totalCount}</p>
              <p>Total Effort: {totalEffort} hours</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.formButton} onClick={() => goToStep(1)}>
          Prev
        </button>
        <button className={styles.formButton}>
          Send
        </button>
      </div>
    </>

  )
}
