import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/workout/add-exercise')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/workout/add-exercise"!</div>
}
