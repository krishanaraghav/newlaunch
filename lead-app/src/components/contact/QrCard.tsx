type QrCardProps = {
  title: string
  imageUrl: string
}

const QrCard = ({ title, imageUrl }: QrCardProps) => (
  <div className="qr-card">
    <div className="qr-target">
      <img src={imageUrl} alt="QR code" width={140} height={140} referrerPolicy="no-referrer" />
    </div>
    <span>{title}</span>
  </div>
)

export default QrCard

