import { api } from 'src/boot/axios';
// TODO: Reemplaza estos tipos con los de tu proyecto
import type { FindBookmarkResponseI, BookmarkI } from '../interfaces/bookmarkInterfaces';
import type { BookmarkDto, BookmarkFilterDto } from '../interfaces/bookmarksDto';

const bookmarksUrl = 'bookmarks';

export const createBookmark = async (payload: BookmarkDto): Promise<BookmarkI> => {
  const res = await api.post<BookmarkI>(bookmarksUrl, payload, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para crear el marcador.',
  });
  return res.data;
};

export const findAllBookmarks = async (
  params?: BookmarkFilterDto,
): Promise<FindBookmarkResponseI> => {
  const res = await api.get<FindBookmarkResponseI>(bookmarksUrl, {
    params,
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para buscar los marcadores.',
  });
  return res.data;
};

export const deleteBookmark = async (params: { userId: number; postId: number }) => {
  const { userId, postId } = params;
  const res = await api.delete(`${bookmarksUrl}/${userId}/${postId}`, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para eliminar el marcador.',
  });
  return res.data;
};
