import styles from './FormStepThree.module.css';
import { useFormContext } from '../../../context/FormContext';
import { useMutation } from '@apollo/client';
import { ADD_RECEIPT, CHANGE_RECEIPT } from '../../../GraphQL/Receipt';

function getSum(total, newValue) {
  return total + (newValue.count * newValue.costPerUnit);
}

const getEffort = (total, newValue) => {
  return total + (newValue.effort * newValue.count);
};

const ExtractCountAndId = (products) => {
  return products.map(({ id, count, ...rest }) => ({ id, count }));
};

export const FormStepThree = ({ Receipt }) => {
  const { Data, goToStep } = useFormContext();

  var isNewReceipt = Receipt ? false : true;
  const products = Data?.products || Receipt?.products || [];
  const totalCount = products.reduce(getSum, 0);
  const totalEffort = products.reduce(getEffort, 0);

  const [editReceipt, { data, error, loading }] = useMutation(CHANGE_RECEIPT);
  const [newReceipt, { data: addReceiptData, error: addReceiptError, loading: addReceiptLoading }] = useMutation(ADD_RECEIPT);

  const sendReceipt = async () => {
    const finalData = ExtractCountAndId(products);
    console.log(products)
    console.log(finalData);
    console.log("Data is :" , {...Data, products: finalData});

    if (!isNewReceipt) {
      try {
        const result = await editReceipt({
          variables: {
            id: Data?.id,
            products: finalData,
            title: Data?.title,
            customerName: Data?.customerName,
            customerAddress: Data?.customerAddress,
            customerNumber: Data?.customerNumber,
            hasPaid: Data?.hasPaid,
            orderData: Data?.orderData,
            deadlineDate: Data?.deadlineDate,
            deadlineNotice: Data?.deadlineNotice,
            state: Data?.state
          }
        });
        console.log(result);
      } catch (e) {
        console.error("Error sending edited receipt:", e);
      }
    }else {
      try {
        const result = await newReceipt({
          variables: {
            products: finalData,
            title: Data?.title,
            customerName: Data?.customerName,
            customerAddress: Data?.customerAddress,
            customerNumber: Data?.customerNumber,
            hasPaid: Data?.hasPaid,
            orderData: Data?.orderData,
            deadlineDate: Data?.deadlineDate,
            deadlineNotice: Data?.deadlineNotice,
            state: Data?.state
          }
        });
        console.log(result);
        alert("Successfully added receipt")
      } catch (e) {
        console.error("Error sending new receipt:", e);
      }
    }
  };

  return (
    <>
      <div className={styles.StepThreeContainer}>
        <div className={styles.ProductsSection}>
          <div className={styles.productsContainer}>
            <div className={styles.productsDetail}>
              <h3 className={styles.productsTitle}>Products</h3>
              <div className={styles.productsInfo}>
                {products.map((item) => (
                  item.count !== 0 ? (
                    <p key={item.id}>
                      {item.count} * {item.title} : ${item.costPerUnit * item.count} (About {item.effort * item.count} hours)
                    </p>
                  ) : null
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
        <button
          className={styles.formButton}
          onClick={sendReceipt}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      {/* Handle errors */}
      {error && <div className={styles.error}>Error: {error.message}</div>}
    </>
  );
};
