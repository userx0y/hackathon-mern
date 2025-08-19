import { color, motion } from "framer-motion";

function MyAnimatedCard() {
  return (
    <motion.div whileHover={{ scale: 1.50, rotate: 20 }} whileTap={{ scale: 1.1, rotate: 20 }} 
    style={{ width: 200, height: 200, backgroundColor: "black", borderRadius: 20, userSelect: "none", color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Home
    </motion.div>
  );
}

export default MyAnimatedCard;
