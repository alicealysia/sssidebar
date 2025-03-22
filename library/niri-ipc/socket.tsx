import {IPCRequest, Reply, IPCResponse as LibResponse} from "./lib";
import {Gio, GLib} from "astal"
/// Name of the environment variable containing the niri IPC socket path.
export const SOCKET_PATH_ENV: string = "NIRI_SOCKET";
/**
 * Helper for blocking communication over the niri socket.
 *
 * This class is used to communicate with the niri IPC server. It handles the socket connection
 * and serialization/deserialization of messages.
 */
export class IPCSocket {
    /// Connects to the default niri IPC socket.
    ///
    /// This is equivalent to calling [`Self::connect_to`] with the path taken from the
    /// [`SOCKET_PATH_ENV`] environment variable.
    public connect = () => {
        let socket_path = GLib.getenv(SOCKET_PATH_ENV);
        if (!socket_path) {throw new Error("No socket path");}
        return this.connect_to(socket_path);
    }
    /// Connects to the niri IPC socket at the given path.
    public connect_to = (path: string) => {
        return new Gio.SocketClient().connect(new Gio.UnixSocketAddress({ path }), null)
    }
    /// Sends a request to niri and returns the response.
    ///    ///
    /// This method also returns a blocking function that you can call to keep reading [`Event`]s
    /// after requesting an [`EventStream`][Request::EventStream]. This function is not useful
    /// otherwise.
    public send = async (request: IPCRequest.RequestType) => {
        console.log (request);
        let connection = this.connect();
        await connection.get_output_stream().write_async(JSON.stringify(request) + "\n", GLib.PRIORITY_DEFAULT); //Max, why is there a null in the original? Please explain.

        let reader = new Gio.DataInputStream({
            closeBaseStream: true,
            baseStream: connection.get_input_stream()
        })
        
        let read_buffer: Reply = reader
            .read_line_async(GLib.PRIORITY_DEFAULT)
            .then((value) => {
                if (value[0] == null) {
                    throw new Error()
                }
                return (JSON.parse(value[0].toString()) as LibResponse);
            });
        
        let events = async () => {
            return await reader
                .read_line_async(GLib.PRIORITY_DEFAULT)
                .then((value) => {
                if (value[0] == null) {
                    throw new Error()
                }
                return (JSON.parse(value[0].toString()) as LibResponse);
            })
        }
        
        return {read_buffer: read_buffer, events: events};
    }
}
