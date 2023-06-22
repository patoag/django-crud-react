import { useForm } from 'react-hook-form'
import { createTask, deleteTask } from '../api/task.api'
import { useNavigate, useParams } from 'react-router-dom'

export function TaskFormPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	// Yup Y Zod son opciones para mejorar las valiadaciones

	const navigate = useNavigate()
	const params = useParams()
	console.log(params)

	const onSubmit = handleSubmit(async (data) => {
		await createTask(data)
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
