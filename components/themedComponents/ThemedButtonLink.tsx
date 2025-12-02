import React from "react";
import { useRouter } from "expo-router";
import ThemedButton from "./ThemedButton";

type ThemedButtonLinkProps = React.ComponentProps<typeof ThemedButton> & {
  href: string;
};

const ThemedButtonLink: React.FC<ThemedButtonLinkProps> = ({
  href,
  ...props
}) => {
  const router = useRouter();

  return (
    <ThemedButton
      {...props}
      onPress={() => router.push(href)}
    />
  );
};

export default ThemedButtonLink;
