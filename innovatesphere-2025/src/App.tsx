import { EVENT_CONFIG } from './utils/constants'

function App() {
  return (
    <div className="min-h-screen bg-black">
      {/* Temporary hero section to test glassmorphism */}
      <div className="hero-gradient min-h-screen flex items-center justify-center p-8">
        <div className="glass-card p-8 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">{EVENT_CONFIG.name}</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
            {EVENT_CONFIG.tagline}
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {EVENT_CONFIG.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base">
            <span className="glass-button">{EVENT_CONFIG.eventType}</span>
            <span className="glass-button">October 24-26, 2025</span>
            <span className="glass-button">{EVENT_CONFIG.totalPrizes}</span>
          </div>
          <button className="glass-button glow-effect animate-pulse-glow text-lg px-8 py-4 font-semibold">
            Register Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
