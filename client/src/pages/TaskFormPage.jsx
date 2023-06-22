import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api'
import { useNavigate, useParams } from 'react-router-dom'

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
		} else {
			await createTask(data)
		}
		navigate('/tasks')
	})

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="title"
					{...register('title', { required: true })}
				/>
				{errors.title && <span>title is required</span>}
				<textarea
					rows="3"
					placeholder="description"
					{...register('description', { required: true })}
				></textarea>
				{errors.description && <span>description is required</span>}

				<button>Create</button>
			</form>

			{params.id && (
				<button
					onClick={async () => {
						const accepted = window.confirm('Are you sure?')
						if (accepted) {
							await deleteTask(params.id)
							navigate('/tasks')
						}
					}}
				>
					Delete
				</button>
			)}
		</div>
	)
}
