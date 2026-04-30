import { connectToDatabase } from '@/database/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔄 Testing MongoDB connection...');

    // Connect to database
    const connection = await connectToDatabase();

    // Test the connection by pinging the database
    const db = connection.connection.db;
    await db.admin().ping();

    const connectionInfo = {
      success: true,
      database: db.databaseName,
      host: connection.connection.host,
      port: connection.connection.port,
      readyState: connection.connection.readyState,
      message: 'MongoDB connection successful!'
    };

    console.log('✅ MongoDB connection successful!');
    console.log(`📊 Database: ${db.databaseName}`);
    console.log(`🌐 Host: ${connection.connection.host}`);
    console.log(`🔌 Port: ${connection.connection.port}`);
    console.log(`📈 Ready State: ${connection.connection.readyState} (1 = connected)`);

    return NextResponse.json(connectionInfo);

  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('Error details:', error);

    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'MongoDB connection failed!'
    }, { status: 500 });
  }
}