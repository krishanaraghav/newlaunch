import QrCard from './QrCard'

type QrGridProps = {
  whatsappQrUrl: string
  callbackQrUrl: string
}

const QrGrid = ({ whatsappQrUrl, callbackQrUrl }: QrGridProps) => (
  <div className="qr-grid">
    <QrCard title="Scan to start a WhatsApp chat" imageUrl={whatsappQrUrl} />
    <QrCard title="Scan to open the call back request form" imageUrl={callbackQrUrl} />
  </div>
)

export default QrGrid

