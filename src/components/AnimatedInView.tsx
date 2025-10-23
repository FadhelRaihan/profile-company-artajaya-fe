import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedInViewProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  from?: "bottom" | "top";
}

const AnimatedInView: React.FC<AnimatedInViewProps> = ({
  children,
  index = 0,
  className = "",
  from = "bottom",
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const offset = from === "bottom" ? 50 : -50;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: offset, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: index * 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedInView;
