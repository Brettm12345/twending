import {usePersonalAccessToken} from '@/atoms/personal-access-token'
import {Button} from '@/components/ui/button'
import {DialogClose, DialogFooter} from '@/components/ui/dialog'
import {Field, FieldError, FieldLabel} from '@/components/ui/field'
import {Input} from '@/components/ui/input'
import {useForm} from '@tanstack/react-form'
import {z} from 'zod'

const schema = z.object({
  personalAccessToken: z.string().min(1),
})
export function PersonalAccessTokenForm({onClose}: {onClose: () => void}) {
  const [personalAccessToken, setPersonalAccessToken] = usePersonalAccessToken()
  const form = useForm({
    onSubmit: ({value}) => {
      setPersonalAccessToken(value.personalAccessToken)
      onClose()
    },
    validators: {
      onSubmit: schema,
    },
    defaultValues: {
      personalAccessToken: personalAccessToken ?? '',
    },
  })
  return (
    <form id="personal-access-token-form" onSubmit={form.handleSubmit}>
      <form.Field
        name="personalAccessToken"
        children={field => {
          const isInvalid =
            field.state.meta.isBlurred && field.state.meta.errors.length > 0
          return (
            <Field>
              <FieldLabel>Personal Access Token</FieldLabel>
              <Input
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                value={field.state.value}
                id={field.name}
                name={field.name}
                aria-invalid={isInvalid}
                placeholder="Enter your personal access token"
                autoComplete="off"
                autoFocus
                spellCheck={false}
                disabled={form.state.isSubmitting}
                required
                aria-required={true}
                aria-describedby={field.name}
                aria-labelledby={field.name}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={form.state.isSubmitting}
          form="personal-access-token-form"
        >
          Save
        </Button>
      </DialogFooter>
    </form>
  )
}
