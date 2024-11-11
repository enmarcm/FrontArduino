import { CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <CircularProgress color="inherit" />
    <span className="ml-4 text-white">Enviando...</span>
  </div>
  )
}

export default Loading