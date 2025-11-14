import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ParallaxPageProps {
  children: React.ReactNode;
  id: string;
}

export default function ParallaxPage({ children, id }: ParallaxPageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Animasi paralaks sederhana: elemen bergerak 50px saat scroll
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section 
      ref={ref} 
      id={id}
      className="h-screen snap-start flex items-center justify-center relative overflow-hidden"
    >
      <div className="w-full max-w-6xl px-8">
        <motion.div style={{ y }}>
          {children}
        </motion.div>
      </div>
    </section>
  )
}