import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Mail, X } from 'lucide-react'

function AccountPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="maison-overlay"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.section
            aria-labelledby="account-title"
            aria-modal="true"
            className="account-panel"
            role="dialog"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            initial={{ opacity: 0, y: 12 }}
          >
            <button aria-label="Close account information" className="drawer-close" onClick={onClose} type="button"><X size={20} /></button>
            <span className="section-index">A MORE PERSONAL MAISON</span>
            <h2 id="account-title">Your world,<br /><em>beautifully considered.</em></h2>
            <p>
              Member accounts are not connected in this preview. For questions
              about an order, we would love to hear from you.
            </p>
            <a className="account-contact" href="mailto:care@maison.studio">
              <Mail size={15} /> CARE@MAISON.STUDIO <ArrowUpRight size={14} />
            </a>
            <span className="account-note">No sign-in details are requested or stored.</span>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AccountPanel
