type LockedContentProps = {
  onUnlock: () => void
  children: React.ReactNode
  isLocked: boolean
  unlockText?: string
}

const LockedContent = ({ onUnlock, children, isLocked, unlockText = 'Unlock Details' }: LockedContentProps) => {
  if (!isLocked) {
    return <>{children}</>
  }

  return (
    <div className="locked-content">
      <div className="locked-overlay">
        <i className="fas fa-lock locked-icon" aria-hidden="true" />
        <button className="cta" onClick={onUnlock}>
          <i className="fas fa-unlock" aria-hidden="true" /> {unlockText}
        </button>
      </div>
      <div className="locked-blur">{children}</div>
    </div>
  )
}

export default LockedContent

