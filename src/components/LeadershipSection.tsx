import { useState } from 'react'

interface TeamMember {
  id: number
  name: string
  role: string
  img: string
}

type FillState = 'fill-top' | 'fill-bottom' | 'empty-top' | 'empty-bottom' | ''

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: 'Diogo Simões',
    role: 'CEO',
    img: 'https://cdn.prod.website-files.com/684c135909b65bbb5f9ddc4a/6931de1103590c61ec499aea_diogo-simoe.jpeg',
  },
  {
    id: 2,
    name: 'Ricardo Jacinto',
    role: 'CFO',
    img: 'https://cdn.prod.website-files.com/684c135909b65bbb5f9ddc4a/68b202b9774545cb914b67e0_ricardo-jacint.jpeg',
  },
  {
    id: 3,
    name: 'Ricardo Correia',
    role: 'CTO Hardware',
    img: 'https://cdn.prod.website-files.com/684c135909b65bbb5f9ddc4a/68b202cc4902a34b3468ed69_ricardo-correi.jpeg',
  },
  {
    id: 4,
    name: 'Jorge Vila',
    role: 'CTO Software',
    img: 'https://cdn.prod.website-files.com/684c135909b65bbb5f9ddc4a/68b202d62191990679dcee4a_jorge-vil.jpeg',
  },
]

export default function LeadershipSection() {
  const [activeId, setActiveId] = useState<number>(1)
  const [fillStates, setFillStates] = useState<Record<number, FillState>>({})

  const handleMouseEnter = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const fromTop = e.clientY - rect.top < rect.height / 2
    setActiveId(id)
    setFillStates(prev => ({ ...prev, [id]: fromTop ? 'fill-top' : 'fill-bottom' }))
  }

  const handleMouseLeave = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const toTop = e.clientY - rect.top < rect.height / 2
    setFillStates(prev => ({ ...prev, [id]: toTop ? 'empty-top' : 'empty-bottom' }))
  }

  const getFillStyle = (member: TeamMember): React.CSSProperties => {
    const state = fillStates[member.id] ?? ''
    const isActive = activeId === member.id && !state.startsWith('empty')
    const isFilled = (isActive && !state) || state === 'fill-top' || state === 'fill-bottom'
    const origin =
      state === 'fill-top' || state === 'empty-top' ? 'top' : 'bottom'
    return {
      position: 'absolute',
      inset: 0,
      background: '#1d1131',
      transformOrigin: origin,
      transform: isFilled ? 'scaleY(1)' : 'scaleY(0)',
      transition: 'transform 0.35s ease',
      zIndex: 0,
    }
  }

  const getTextColor = (member: TeamMember, muted = false) => {
    const state = fillStates[member.id] ?? ''
    const isActive = activeId === member.id && !state.startsWith('empty')
    const isFilled = (isActive && !state) || state === 'fill-top' || state === 'fill-bottom'
    if (isFilled) return muted ? 'rgba(255,255,255,0.55)' : '#fff'
    return muted ? '#999' : '#1d1131'
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
      }}
    >
      <div style={{ display: 'flex', gap: 60, width: '100%', maxWidth: 1100, alignItems: 'flex-start' }}>

        {/* LEFT — Photo */}
        <div style={{ flex: '0 0 420px', position: 'relative', height: 520, overflow: 'hidden', borderRadius: 4 }}>
          {TEAM.map(member => (
            <img
              key={member.id}
              src={member.img}
              alt={member.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                opacity: activeId === member.id ? 1 : 0,
                transform: activeId === member.id ? 'scale(1.02)' : 'scale(1)',
                transition: 'opacity 0.5s ease, transform 0.6s ease',
              }}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 520 }}>
          <div>
            <h2 style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.1, color: '#1d1131', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
              Our<br />managing team
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, color: '#aaa', fontSize: 13, letterSpacing: '0.05em', marginBottom: 40 }}>
              <span>[</span>
              <span style={{ color: '#1d1131', fontWeight: 500, margin: '0 3px' }}>{TEAM.length}</span>
              <span>]</span>
            </div>
            <a
              href="#"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 32, color: '#1d1131', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              <span style={{ width: 36, height: 36, border: '1px solid #1d1131', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M4.45231 0.385986H6.02531L9.30131 3.99999L6.02531 7.61399H4.45231L7.40331 4.58499H0.695312V3.42799H7.41631L4.45231 0.385986Z" fill="#1d1131" />
                </svg>
              </span>
              Explore careers
            </a>
          </div>

          {/* Team List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[...TEAM].reverse().map((member, idx, arr) => (
              <button
                key={member.id}
                onMouseEnter={e => handleMouseEnter(member.id, e)}
                onMouseLeave={e => handleMouseLeave(member.id, e)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#f6f6f6',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '18px 22px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #e8e8e8',
                  borderBottom: idx === arr.length - 1 ? '1px solid #e8e8e8' : 'none',
                }}
              >
                {/* Fill overlay — replaces ::after */}
                <div style={getFillStyle(member)} />

                <span style={{ position: 'relative', zIndex: 1, fontSize: 16, fontWeight: 500, color: getTextColor(member), letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}>
                  {member.name}
                </span>
                <span style={{ position: 'relative', zIndex: 1, fontSize: 11, fontWeight: 400, color: getTextColor(member, true), letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease' }}>
                  {member.role}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
