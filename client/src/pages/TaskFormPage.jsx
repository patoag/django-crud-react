import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function TaskFormPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm()

	// Yup Y Zod son opciones para mejorar las valiadaciones

	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {
		async function loadTask() {
			if (params.id) {
				// fetch task
				const {
					data: { title, description },
				} = await getTask(params.id)
				setValue('title', title)
				setValue('description', description)
			}
		}
		loadTask()
	}, [])

	const onSubmit = handleSubmit(async (data) => {
		if (params.id) {
			await updateTask(params.id, data)
			toast.success('Task updated', {
				position: 'buttom-right',
				style: {
					borderRadius: '10px',
					background: '#101010',
					color: '#fff',
				}
			})
		} else {
			await createTask(data)
			toast.success('New task added', {
				position: 'buttom-right',	
				style: {
					borderRadius: '10px',
					background: '#101010',
					color: '#fff',
				}
			})
		}
		navigate('/tasks')
	})

	return (
		<div className='max-w-xl mx-auto'>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="title"
					{...register('title', { required: true })}
					className='bg-zinc-700 p-3 rounded-lg w-full mb-3'
				/>
				{errors.title && <span>title is required</span>}
				<textarea
					rows="3"
					placeholder="description"
					{...register('description', { required: true })}
					className='bg-zinc-700 p-3 rounded-lg w-full mb-3'
				></textarea>
				{errors.description && <span>description is required</span>}

				<button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
			</form>

			{params.id && (
				<button
					onClick={async () => {
						const accepted = window.confirm('Are you sure?')
						if (accepted) {
							await deleteTask(params.id)
							toast.success('Task deleted', {
								position: 'buttom-right',
								style: {
									borderRadius: '10px',
									background: '#101010',
									color: '#fff',
								}
							})
							navigate('/tasks')
						}
					}}
					className='bg-red-500 p-3 rounded-lg block w-full mt-3'
				>
					Delete
				</button>
			)}
		</div>
	)
}
