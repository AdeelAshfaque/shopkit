import styles from './ProductCard.module.css'

function ProductCard() {
  return (
    <article className={styles.card}>
        <h3>Wireless Headphones</h3>
        <p>High quality sound for everyday use.</p>
        <p className={styles.price}>Rs. 4,500</p>
    </article>
  )
}

export default ProductCard
