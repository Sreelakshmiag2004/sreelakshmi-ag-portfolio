import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ParticlesBackground } from '@/components/ui/particles-background';
import * as THREE from 'three';

// 3D Skill Bubble Component
const SkillBubble = ({ text, position, color }: { text: string; position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[1]) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const SkillsScene = () => {
  const skills = [
    { text: "Python", position: [-2, 1, 0] as [number, number, number], color: "#3776ab" },
    { text: "Java", position: [2, 0.5, -1] as [number, number, number], color: "#ed8b00" },
    { text: "React", position: [0, 2, 1] as [number, number, number], color: "#61dafb" },
    { text: "HTML/CSS", position: [-1.5, -1, 0.5] as [number, number, number], color: "#e34f26" },
    { text: "Git", position: [1.5, -0.5, -0.5] as [number, number, number], color: "#f05032" },
    { text: "Linux", position: [-0.5, 0, -2] as [number, number, number], color: "#fcc624" },
    { text: "Figma", position: [0.5, -1.5, 1] as [number, number, number], color: "#f24e1e" },
    { text: "Mobile Dev", position: [-2.5, 0, 1.5] as [number, number, number], color: "#06b6d4" },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#60A5FA" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />
      {skills.map((skill, index) => (
        <SkillBubble key={index} {...skill} />
      ))}
    </>
  );
};

export const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "Java (OOP)", "C"],
      color: "cosmic-blue"
    },
    {
      title: "Web & App Development",
      skills: ["HTML", "CSS", "Responsive Design", "Mobile Development"],
      color: "cosmic-purple"
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Linux"],
      color: "cosmic-cyan"
    },
    {
      title: "UI/UX Design",
      skills: ["Figma", "Canva", "User Interface Design"],
      color: "cosmic-pink"
    }
  ];

  return (
    <div className="relative min-h-screen pt-24 px-6">
      <ParticlesBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Skills & Expertise
          </h1>
          <p className="text-xl text-muted-foreground">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* 3D Skills Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="h-96 mb-16 rounded-2xl overflow-hidden"
        >
          <Canvas 
            camera={{ position: [0, 0, 6], fov: 50 }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0);
            }}
            fallback={<div className="w-full h-full bg-gradient-cosmic rounded-2xl flex items-center justify-center text-white text-xl">3D Skills Visualization</div>}
          >
            <SkillsScene />
          </Canvas>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-cosmic group"
            >
              <div className={`w-12 h-12 rounded-xl bg-${category.color} mb-4 flex items-center justify-center shadow-glow-primary group-hover:shadow-glow-secondary transition-all duration-300`}>
                <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-gradient">
                {category.title}
              </h3>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 + skillIndex * 0.05 }}
                    className="bg-muted/20 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Proficiency Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-gradient">Proficiency Levels</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { level: "Advanced", skills: "Python, Java, React", percentage: 85 },
              { level: "Intermediate", skills: "Mobile Dev, UI/UX", percentage: 75 },
              { level: "Proficient", skills: "Linux, Git, Tools", percentage: 90 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="card-glass text-center"
              >
                <div className="text-3xl font-bold text-gradient mb-2">
                  {item.percentage}%
                </div>
                <div className="font-semibold mb-1">{item.level}</div>
                <div className="text-sm text-muted-foreground">{item.skills}</div>
                <div className="mt-3 w-full bg-muted/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 1 }}
                    className="bg-gradient-electric h-2 rounded-full shadow-glow-accent"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};