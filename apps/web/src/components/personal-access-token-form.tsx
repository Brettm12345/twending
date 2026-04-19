/** biome-ignore-all lint/correctness/noChildrenProp: the most elegant way to handle the higher order component pattern */

import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { usePersonalAccessToken } from "@/atoms/personal-access-token";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DrawerFooter } from "@/components/ui/drawer";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";

const schema = z.object({
  personalAccessToken: z.string().min(1),
});
export function PersonalAccessTokenForm({ onClose }: { onClose: () => void }) {
  const [personalAccessToken, setPersonalAccessToken] =
    usePersonalAccessToken();
  const form = useForm({
    onSubmit: ({ value }) => {
      setPersonalAccessToken(value.personalAccessToken);
      onClose();
    },
    validators: {
      onSubmit: schema,
    },
    defaultValues: {
      personalAccessToken: personalAccessToken ?? "",
    },
  });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const Footer = isMobile ? DrawerFooter : DialogFooter;
  return (
    <form id="personal-access-token-form" onSubmit={form.handleSubmit}>
      <FieldGroup className="px-4 pt-2 md:p-0">
        <form.Field
          name="personalAccessToken"
          children={(field) => {
            const isInvalid =
              field.state.meta.isBlurred && field.state.meta.errors.length > 0;
            return (
              <Field>
                <FieldLabel>Personal Access Token</FieldLabel>
                <Input
                  aria-describedby={field.name}
                  aria-invalid={isInvalid}
                  aria-labelledby={field.name}
                  aria-required={true}
                  autoComplete="off"
                  autoFocus
                  disabled={form.state.isSubmitting}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your personal access token"
                  required
                  spellCheck={false}
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <Footer className="mt-4">
        <Button onClick={onClose} type="button" variant="outline">
          Close
        </Button>
        <Button
          disabled={form.state.isSubmitting}
          form="personal-access-token-form"
          type="submit"
        >
          Save
        </Button>
      </Footer>
    </form>
  );
}
