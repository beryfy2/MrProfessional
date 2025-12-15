import { useEffect, useState } from 'react';
import type { Enquiry } from '../../../common/types';
import { getJSON } from '../lib/api';

export default function Enquiries() {
  const [list, setList] = useState<Enquiry[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    getJSON<Enquiry[]>('/enquiries').then(setList);
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Enquiries</h1>
        <p className="page-subtitle">View and manage customer enquiries</p>
        <button className="btn">Filter</button>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {list.map((e) => (
          <div key={e._id} className="card" style={{ display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{e.subject}</div>
                <div style={{ fontSize: 13, color: '#6B7280' }}>
                  {e.companyName} • {e.contactPerson} • {e.email}
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>{e.date ? new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</div>
            </div>
            {openId === e._id && (
              <div style={{ color: '#374151', fontSize: 14 }}>{e.message}</div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <a className="btn primary" href={`mailto:${e.email}?subject=Re: ${encodeURIComponent(e.subject)}`}>Respond</a>
              <button className="btn" onClick={() => setOpenId(openId === e._id ? null : e._id!)}>
                {openId === e._id ? 'Hide Details' : 'View Details'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
