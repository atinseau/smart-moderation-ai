import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

type ContentPageFilterDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ContentPageFilterDrawer(props: ContentPageFilterDrawerProps) {
  return <Drawer
    open={props.isOpen}
    onOpenChange={props.setIsOpen}
  >
    <DrawerContent>
      <DrawerFooter>
        <DrawerClose>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}
