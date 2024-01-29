import { Item, Menu, Separator, Submenu } from "react-contexify";
import { Stack } from "react-bootstrap";
import {
  BiAddToQueue,
  BiBarChart,
  BiDownload,
  BiFolderOpen,
  BiInfoCircle,
  BiLinkAlt,
  BiPencil,
  BiSearch,
  BiStar,
  BiTrash,
  BiUserPlus,
} from "react-icons/bi";

type ItemContextMenuProps =
  | {
      id: string;
      isDir: false;
      dirName?: string;
      downloadFunc: () => void;
      renameFunc?: () => void;
      deleteItem: () => Promise<void>;
    }
  | {
      id: string;
      isDir: true;
      dirName: string;
      downloadFunc: () => void;
      renameFunc?: () => void;
      deleteItem: () => Promise<void>;
    };

const ItemContextMenu = ({
  id,
  isDir,
  dirName,
  downloadFunc,
  renameFunc,
  deleteItem,
}: ItemContextMenuProps) => {
  return (
    <>
      <Menu className={"contextMenu"} animation={false} id={id}>
        <Item onClick={() => downloadFunc()}>
          <Stack direction={"horizontal"} gap={3}>
            <div style={{ fontSize: "20px" }}>
              <BiDownload />
            </div>
            <div>Download</div>
          </Stack>
        </Item>
        <Item onClick={() => (renameFunc ? renameFunc() : "")}>
          <Stack direction={"horizontal"} gap={3}>
            <div style={{ fontSize: "20px" }}>
              <BiPencil />
            </div>
            <div>Rename</div>
          </Stack>
        </Item>
        <Separator />
        <Submenu
          label={
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiUserPlus />
              </div>
              <div>Share</div>
            </Stack>
          }
        >
          <Item onClick={() => console.log("Working Context menu")}>
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiUserPlus />
              </div>
              <div>Share</div>
            </Stack>
          </Item>
          <Item onClick={() => console.log("Working Context menu")}>
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiLinkAlt />
              </div>
              <div>Copy Link</div>
            </Stack>
          </Item>
        </Submenu>
        <Submenu
          label={
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiFolderOpen />
              </div>
              <div>Organize</div>
            </Stack>
          }
        >
          <Item onClick={() => console.log("Working Context menu")}>
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiDownload />
              </div>
              <div>Move</div>
            </Stack>
          </Item>
          <Item onClick={() => console.log("Working Context menu")}>
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiAddToQueue />
              </div>
              <div>Add Shortcut</div>
            </Stack>
          </Item>
          <Item onClick={() => console.log("Working Context menu")}>
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiStar />
              </div>
              <div>Add to starred</div>
            </Stack>
          </Item>
        </Submenu>
        <Submenu
          label={
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiInfoCircle />
              </div>
              <div>File Information</div>
            </Stack>
          }
        >
          <Item onClick={() => console.log("Working Context menu")}>
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiInfoCircle />
              </div>
              <div>Details</div>
            </Stack>
          </Item>
          <Item onClick={() => console.log("Working Context menu")}>
            <Stack direction={"horizontal"} gap={3}>
              <div style={{ fontSize: "20px" }}>
                <BiBarChart />
              </div>
              <div>Activity</div>
            </Stack>
          </Item>
          {isDir ? (
            <>
              <Item onClick={() => console.log("Working Context menu")}>
                <Stack direction={"horizontal"} gap={3}>
                  <div style={{ fontSize: "20px" }}>
                    <BiSearch />
                  </div>
                  <div>Search within {dirName}</div>
                </Stack>
              </Item>
            </>
          ) : (
            ""
          )}
        </Submenu>
        <Separator />
        <Item onClick={deleteItem}>
          <Stack direction={"horizontal"} gap={3}>
            <div style={{ fontSize: "20px" }}>
              <BiTrash />
            </div>
            <div>Delete</div>
          </Stack>
        </Item>
      </Menu>
    </>
  );
};

export default ItemContextMenu;
