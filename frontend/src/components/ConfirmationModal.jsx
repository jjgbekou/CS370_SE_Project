import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Loading } from './Loading'
import { AlertModal } from './AlertModal'

export function ConfirmationModal({title, message, buttonCancel, buttonConfirm, isOpen, setIsOpen, confirmationFunction, confirmationParams}) {
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [alertIsOpen, setAlertIsOpen] = useState(false)

    function openAlertModal() {
        setAlertIsOpen(true)
    }

    function closeAlertModal() {
        setAlertIsOpen(false)
    }

  function closeModal() {
    setIsOpen(false)
  }

  async function handleConfirmation() {
    setLoading(true)
    await confirmationFunction(confirmationParams)
    setLoading(false)
    openAlertModal()
    setDone(true)
  }

  return (
    <>
        {!done ? 
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {!loading && <>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {message}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-around">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 bg-red-500"
                      onClick={closeModal}
                    >
                      {buttonCancel}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 bg-green-500"
                      onClick={handleConfirmation}
                    >
                      {buttonConfirm}
                    </button>
                  </div></>}
                  {loading && <Loading/>}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> : <AlertModal title={"Success"} message={"Action went through successfully. Click confirm to return to page."} button={"Confirm"} isOpen={alertIsOpen} setIsOpen={setAlertIsOpen} doneFunction={closeAlertModal}/>}
    </>
  )
}
